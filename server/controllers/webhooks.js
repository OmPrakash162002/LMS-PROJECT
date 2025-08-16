import { Webhook } from "svix";
import { User } from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import { Course } from "../models/Course.js";

// Api Controller Function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {

  console.log("👉 Stripe webhook endpoint hit");
console.log("Headers:", request.headers);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(" Stripe event received:", event.type);  // debuging 
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  

  switch (event.type) {
        case "checkout.session.completed": {
        const session = event.data.object;
        console.log("📦 Checkout session completed:", session.id);
        console.log("📦 Session metadata:", session.metadata);  //debuging

        const { purchaseId } = session.metadata;
        const purchaseData = await Purchase.findById(purchaseId);

        if (!purchaseData) {
          console.error("Purchase not found:", purchaseId);
          break;
        }

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        // Enroll student into course
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();

        // Add course to user's enrolledCourses
        userData.enrolledCourses.push(courseData._id);
        await userData.save();

        // Mark purchase as completed
        purchaseData.status = "completed";
        await purchaseData.save();

        break;
      }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
       console.log("💳 PaymentIntent succeeded:", paymentIntent.id);
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      console.log("📦 Sessions for PI:", session.data);
      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(
        purchaseData.courseId.toString()
      );

      courseData.enrolledStudents.push(userData);
      await courseData.save();

      userData.enrolledCourses.push(courseData._id);
      await userData.save();

      purchaseData.status = "completed";
      await purchaseData.save();

      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      purchaseData.status = "failed";
      await purchaseData.save();

      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }


  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
};
