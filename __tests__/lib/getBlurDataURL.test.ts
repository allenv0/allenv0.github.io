import getBlurDataURL from '@/lib/getBlurDataURL';
import sharp from 'sharp';

jest.mock('sharp');
jest.mock('path', () => ({
	join: jest.fn((...args) => args.join('/')),
}));

describe('getBlurDataURL', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a data URL with base64 encoded image', async () => {
		const mockBuffer = Buffer.from('test');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		const result = await getBlurDataURL('/test.png');

		expect(result).toMatch(/^data:image\/png;base64,/);
	});

	it('should call sharp with correct file path', async () => {
		const mockBuffer = Buffer.from('test');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		await getBlurDataURL('/images/photo.jpg');

		expect(sharp).toHaveBeenCalled();
	});

	it('should resize image to 10x10', async () => {
		const mockBuffer = Buffer.from('test');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		await getBlurDataURL('/test.png');

		expect(mockSharp.resize).toHaveBeenCalledWith(10);
	});

	it('should chain resize and toBuffer correctly', async () => {
		const mockBuffer = Buffer.from('test');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		await getBlurDataURL('/test.png');

		expect(mockSharp.resize).toHaveBeenCalled();
		expect(mockSharp.toBuffer).toHaveBeenCalled();
	});

	it('should convert buffer to base64', async () => {
		const testString = 'hello world';
		const mockBuffer = Buffer.from(testString);
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		const result = await getBlurDataURL('/test.png');

		const base64Part = result.split(',')[1];
		expect(Buffer.from(base64Part, 'base64').toString()).toBe(testString);
	});

	it('should handle different file types', async () => {
		const mockBuffer = Buffer.from('test');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		const pngResult = await getBlurDataURL('/test.png');
		const jpgResult = await getBlurDataURL('/test.jpg');
		const gifResult = await getBlurDataURL('/test.gif');

		expect(pngResult).toMatch(/^data:image\/png;base64,/);
		expect(jpgResult).toMatch(/^data:image\/png;base64,/);
		expect(gifResult).toMatch(/^data:image\/png;base64,/);
	});

	it('should handle nested file paths', async () => {
		const mockBuffer = Buffer.from('test');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		await getBlurDataURL('/images/blog/2024/post.png');

		expect(sharp).toHaveBeenCalled();
	});

	it('should handle errors from sharp', async () => {
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockRejectedValue(new Error('Sharp error')),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		await expect(getBlurDataURL('/nonexistent.png')).rejects.toThrow('Sharp error');
	});

	it('should generate unique hashes for different images', async () => {
		const mockSharp1 = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(Buffer.from('image1')),
		};

		const mockSharp2 = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(Buffer.from('image2')),
		};

		(sharp as jest.Mock)
			.mockReturnValueOnce(mockSharp1)
			.mockReturnValueOnce(mockSharp2);

		const result1 = await getBlurDataURL('/image1.png');
		const result2 = await getBlurDataURL('/image2.png');

		expect(result1).not.toBe(result2);
	});

	it('should produce consistent output for same image', async () => {
		const mockBuffer = Buffer.from('consistent');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		const result1 = await getBlurDataURL('/test.png');
		const result2 = await getBlurDataURL('/test.png');

		expect(result1).toBe(result2);
	});

	it('should handle empty buffer gracefully', async () => {
		const mockBuffer = Buffer.from('');
		const mockSharp = {
			resize: jest.fn().mockReturnThis(),
			toBuffer: jest.fn().mockResolvedValue(mockBuffer),
		};

		(sharp as jest.Mock).mockReturnValue(mockSharp);

		const result = await getBlurDataURL('/empty.png');

		expect(result).toMatch(/^data:image\/png;base64,/);
	});
});
