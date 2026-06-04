import multer from 'multer';

const upload = multer({
    dest: 'uploads/'
}); // Multer middleware

export default upload;