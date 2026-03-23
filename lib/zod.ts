import z from 'zod';

export const UploadSchema = z.object({
  pdf: z.instanceof(File).refine(
    (file) => file.size <= 50 * 1024 * 1024,
    'PDF file must be less than 50MB'
  ),
  coverImage: z.instanceof(File).optional().or(z.null()),
  title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
  author: z.string().min(1, 'Author is required').min(2, 'Author name must be at least 2 characters'),
  voice: z.enum(['Dave', 'Daniel', 'Chris', 'Rachel', 'Sarah'], {
    errorMap: () => ({ message: 'Please select a voice' }),
  }),
});
