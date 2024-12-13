const uploadFile = async (file) => {
    // Verify Cloudinary cloud name from environment
    if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
        throw new Error('Cloudinary cloud name is not defined in the environment variables.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app-file');

    // Cloudinary URL from environment variable
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Cloudinary upload failed with status: ${response.status}`);
        }

        const responseData = await response.json();

        // Check for successful upload in Cloudinary response
        if (responseData?.secure_url) {
            return responseData;
        } else {
            throw new Error('Cloudinary returned an error: ' + (responseData?.error?.message || 'Unknown error'));
        }
    } catch (error) {
        console.error("Upload failed:", error);
        throw new Error(`Upload failed: ${error.message}`);
    }
};

export default uploadFile;
