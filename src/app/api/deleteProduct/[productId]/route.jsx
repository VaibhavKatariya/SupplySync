import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { firestoreAdmin } from '@/lib/firebaseAdmin'; // Adjust path as needed

export async function DELETE(request, { params }) {
  try {
    const { productId } = params;

    // Check authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Ensure the productId is provided
    if (!productId) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    // Reference to the product document
    const productRef = firestoreAdmin.doc(`products/${userId}/userProducts/${productId}`);

    // Delete the product from Firestore
    await productRef.delete();

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Failed to delete product' }, { status: 500 });
  }
}
