import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import { use } from "react";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "alcoach" });

// Create a client to send events
export const syncUserCreation = inngest.createFunction(
  {
    id: "alcoach-client",

    eventHandlerUrl: process.env.NEXT_PUBLIC_INNGEST_EVENT_HANDLER_URL,
    apiKey: process.env.NEXT_PUBLIC_INNGEST_API_KEY,
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);
// inngest function to handle user updates
export const syncUserUpdate = inngest.createFunction(
  {
    id: "alcoach-client-update",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// inngest function to handle user deletion
export const syncUserDeletion = inngest.createFunction(
  {
    id: "alcoach-client-delete",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
  },
  {
    event: "order/created",
  },
  async ({ events }) => {
    const order = events.map((event) => {
      return {
        user: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date,
      };
    });
    await connectDB();
    await Order.insertMany(order);
    return {
      success: true,
      processed: order.length,
    };
  }
);
