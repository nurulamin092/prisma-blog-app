import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    console.log("******* Admin seeding stated ******");
    const adminData = {
      name: "Admin Mia",
      email: "admin.mia@admin.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };

    // check user exist on db or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exist in db");
    }

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (signUpAdmin.ok) {
      console.log("*** Admin Created ***");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });

      console.log("**** Email verification status updated! ***");
    }
    console.log(signUpAdmin);
  } catch (err) {
    console.error(err);
  }
}

seedAdmin();
