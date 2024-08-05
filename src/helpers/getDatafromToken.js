import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server'; // Ensure this import if using `NextRequest`

export const getDataFromToken = (request) => {
    try {
        // Extract the token from cookies
        const cookies = request.cookies;
        const token = cookies.get("token")?.value || '';

        if (!token) {
            throw new Error('No token found');
        }

        console.log("token:", token);

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Return the ID or any other data from the token
        return decodedToken.id;
    } catch (error) {
        console.error(error.message);
        // Handle the error appropriately, return or throw based on your application's needs
        throw new Error('Invalid or expired token');
    }
}
