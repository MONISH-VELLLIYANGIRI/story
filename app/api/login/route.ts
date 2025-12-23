import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Get user
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return Response.json({ error: "Invalid email or password" }, { status: 400 });
    }

    const user = rows[0];

    // Compare password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return Response.json({ error: "Invalid email or password" }, { status: 400 });
    }

    return Response.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
