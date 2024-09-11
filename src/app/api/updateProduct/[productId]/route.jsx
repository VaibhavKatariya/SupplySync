// /api/updateProduct/[productId]/route.js
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { firestoreAdmin } from '@/lib/firebaseAdmin'; // Adjust path as needed

export async function PUT(request, { params }) {
    try {
        // Console log environment variables for debugging
        console.log('Environment Variables:', {
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'Exists' : 'Not Found',
            FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
        });

        // Check for Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error('Unauthorized: Missing or invalid Authorization header');
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify the Firebase ID token
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(token);
        } catch (authError) {
            console.error('Error verifying Firebase token:', authError);
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const userId = decodedToken.uid;
        const productId = params.productId;

        // Parse request body and validate fields
        let updateData;
        try {
            updateData = await request.json();
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
        }

        const { price, stock } = updateData;

        if (typeof price !== 'number' || typeof stock !== 'number') {
            console.error('Invalid data types:', { price, stock });
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        if (price <= 0 || stock < 0) { // Allow stock to be zero
            console.error('Invalid data values:', { price, stock });
            return NextResponse.json({ message: 'Price and stock values are invalid' }, { status: 400 });
        }

        // Update product in Firestore
        try {
            const productRef = firestoreAdmin.collection(`products/${userId}/userProducts`).doc(productId);
            await productRef.update({ price, stock });
            console.log('Product updated successfully:', { productId, price, stock });
        } catch (firestoreError) {
            console.error('Error updating product in Firestore:', firestoreError);
            return NextResponse.json({ message: 'Failed to update product' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Unexpected error in PUT /updateProduct:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
