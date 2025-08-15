import { addSubscriber, checkRateLimit, resetRateLimits } from "./newsletter";

export async function handleNewsletterAction(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || 
                    request.headers.get("x-real-ip") || 
                    "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const email = formData.get("email") as string;
    const reset = formData.get("reset") as string;

    // Development helper to reset rate limits
    if (reset === "ratelimits") {
      resetRateLimits();
      return Response.json({
        success: true,
        message: "Rate limits have been reset for development."
      });
    }

    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Add subscriber
    const subscriber = await addSubscriber(email);

    return Response.json({
      success: true,
      message: "Thank you for subscribing! You'll receive updates when I publish new ideas and projects.",
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt
      }
    });

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid email format") {
        return Response.json(
          { error: "Please enter a valid email address" },
          { status: 400 }
        );
      }
      
      if (error.message === "Email already subscribed") {
        return Response.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      }
    }

    console.error("Newsletter subscription error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}