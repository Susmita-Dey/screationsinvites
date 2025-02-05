import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Coupon, { ICoupon } from "@/models/Coupon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Create a new coupon (Admin only)
export async function POST(request: Request) {
    try {
     await connectToDatabase();
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body:ICoupon = await request.json();
        if (!body.code || !body.discount || !body.validFrom || !body.validTill || !body.usageLimit) {
            return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
        }

        const newCoupon = await Coupon.create(body);
        return NextResponse.json({ newCoupon }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

// Get all coupons (Admin only)
export async function GET() {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const coupons = await Coupon.find({}).lean();
        return NextResponse.json(coupons, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

// Validate a coupon (Public)
export async function PUT(request: Request) {
    try {
        await connectToDatabase();
        const { code } = await request.json();
        if (!code) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
        }

        if (coupon.validFrom > new Date() || coupon.validTill < new Date()) {
            return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
        }

        if (coupon.usageLimit <= 0) {
            return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
        }

        return NextResponse.json({ coupon }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

// Update a coupon (Admin only)
export async function PATCH(request: Request) {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { code, ...body } = await request.json();
        if (!code) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const coupon = await Coupon.findOneAndUpdate({ code }, body, { new: true });
        if (!coupon) {
            return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
        }

        return NextResponse.json({ coupon }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

// Delete a coupon (Admin only)
export async function DELETE(request: Request) {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { code } = await request.json();
        if (!code) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const coupon = await Coupon.findOneAndDelete({ code });
        if (!coupon) {
            return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Coupon deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}