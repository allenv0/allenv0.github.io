import mergeMetadata from '@/lib/mergeMetadata';

describe('mergeMetadata', () => {
	const originalEnv = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...originalEnv };
		delete process.env.NEXT_PUBLIC_BASE_URL;
		delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	describe('default metadata', () => {
		it('should return default metadata when no arguments provided', () => {
			const metadata = mergeMetadata();

			expect(metadata.title).toBe('Allen Lee');
			expect(metadata.description).toBe('My code sometimes works.');
		});

		it('should include default favicon paths', () => {
			const metadata = mergeMetadata();

			expect(metadata.icons?.icon).toBeDefined();
			expect(metadata.icons?.shortcut).toBe('/favicon-v2.ico');
			expect(metadata.icons?.apple).toBe('/favicon-v2.ico');
		});

		it('should include manifest', () => {
			const metadata = mergeMetadata();

			expect(metadata.manifest).toBe('/site.webmanifest');
		});

		it('should include default OpenGraph data', () => {
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.siteName).toBe('ALE');
			expect(metadata.openGraph?.title).toBe('ALE');
			expect(metadata.openGraph?.description).toBe('My code sometimes works.');
		});

		it('should include default Twitter data', () => {
			const metadata = mergeMetadata();

			expect(metadata.twitter?.card).toBe('summary_large_image');
			expect(metadata.twitter?.title).toBe('ALE');
			expect(metadata.twitter?.site).toBe('@wartimecto');
		});
	});

	describe('custom title', () => {
		it('should use custom title', () => {
			const metadata = mergeMetadata({ title: 'My Project' });

			expect(metadata.title).toBe('My Project • ALE');
		});

		it('should apply custom title to OpenGraph', () => {
			const metadata = mergeMetadata({ title: 'Test Page' });

			expect(metadata.openGraph?.title).toBe('Test Page');
		});

		it('should apply custom title to Twitter', () => {
			const metadata = mergeMetadata({ title: 'Test Page' });

			expect(metadata.twitter?.title).toBe('Test Page');
		});
	});

	describe('custom description', () => {
		it('should use custom description', () => {
			const metadata = mergeMetadata({ description: 'Custom description' });

			expect(metadata.description).toBe('Custom description');
		});

		it('should apply custom description to OpenGraph', () => {
			const metadata = mergeMetadata({ description: 'Custom description' });

			expect(metadata.openGraph?.description).toBe('Custom description');
		});
	});

	describe('custom image', () => {
		it('should use custom image path', () => {
			const metadata = mergeMetadata({ image: '/images/custom.png' });

			expect(metadata.openGraph?.images?.url).toContain('custom.png');
		});

		it('should apply image to Twitter card', () => {
			const metadata = mergeMetadata({ image: '/images/custom.png' });

			expect(metadata.twitter?.images?.[0]?.url).toContain('custom.png');
		});

		it('should prepend base URL to image path', () => {
			process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';
			const metadata = mergeMetadata({ image: '/images/custom.png' });

			expect(metadata.openGraph?.images?.url).toContain('https://example.com');
		});
	});

	describe('custom image alt', () => {
		it('should use custom image alt text', () => {
			const metadata = mergeMetadata({
				image: '/images/custom.png',
				imageAlt: 'Custom alt text',
			});

			expect(metadata.openGraph?.images?.alt).toBe('Custom alt text');
		});

		it('should apply alt text to Twitter', () => {
			const metadata = mergeMetadata({
				image: '/images/custom.png',
				imageAlt: 'Custom alt text',
			});

			expect(metadata.twitter?.images?.[0]?.alt).toBe('Custom alt text');
		});
	});

	describe('base URL handling', () => {
		it('should use NEXT_PUBLIC_BASE_URL when set', () => {
			process.env.NEXT_PUBLIC_BASE_URL = 'https://mysite.com';
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.images?.url).toContain('https://mysite.com');
		});

		it('should use VERCEL_PROJECT_PRODUCTION_URL as fallback', () => {
			process.env.VERCEL_PROJECT_PRODUCTION_URL = 'vercel-site.com';
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.images?.url).toContain('https://vercel-site.com');
		});

		it('should use localhost as final fallback', () => {
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.images?.url).toContain('http://localhost:3000');
		});

		it('should prefer NEXT_PUBLIC_BASE_URL over VERCEL', () => {
			process.env.NEXT_PUBLIC_BASE_URL = 'https://mysite.com';
			process.env.VERCEL_PROJECT_PRODUCTION_URL = 'vercel-site.com';
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.images?.url).toContain('https://mysite.com');
			expect(metadata.openGraph?.images?.url).not.toContain('vercel-site.com');
		});
	});

	describe('default image handling', () => {
		it('should use default card image when no image provided', () => {
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.images?.url).toContain('/images/card-image.png');
		});

		it('should use default card image for Twitter when no image provided', () => {
			const metadata = mergeMetadata();

			expect(metadata.twitter?.images?.[0]?.url).toContain('/images/card-image.png');
		});

		it('should use default alt text when no imageAlt provided', () => {
			const metadata = mergeMetadata();

			expect(metadata.openGraph?.images?.alt).toContain('ALE');
		});
	});

	describe('favicon handling', () => {
		it('should set favicon icon array correctly', () => {
			const metadata = mergeMetadata();

			expect(Array.isArray(metadata.icons?.icon)).toBe(true);
			expect((metadata.icons?.icon as any)?.[0]?.url).toBe('/favicon-v2.ico');
			expect((metadata.icons?.icon as any)?.[0]?.sizes).toBe('16x16 32x32');
		});
	});

	describe('combined options', () => {
		it('should merge all custom options', () => {
			const metadata = mergeMetadata({
				title: 'My Blog',
				description: 'A tech blog',
				image: '/images/blog.png',
				imageAlt: 'Blog cover',
			});

			expect(metadata.title).toBe('My Blog • ALE');
			expect(metadata.description).toBe('A tech blog');
			expect(metadata.openGraph?.images?.url).toContain('/images/blog.png');
			expect(metadata.openGraph?.images?.alt).toBe('Blog cover');
			expect(metadata.twitter?.images?.[0]?.url).toContain('/images/blog.png');
		});

		it('should maintain structure with all fields populated', () => {
			const metadata = mergeMetadata({
				title: 'Full Page',
				description: 'Full description',
				image: '/images/full.png',
				imageAlt: 'Full image',
			});

			expect(metadata).toHaveProperty('title');
			expect(metadata).toHaveProperty('description');
			expect(metadata).toHaveProperty('icons');
			expect(metadata).toHaveProperty('manifest');
			expect(metadata).toHaveProperty('openGraph');
			expect(metadata).toHaveProperty('twitter');
		});
	});

	describe('edge cases', () => {
		it('should handle empty string title', () => {
			const metadata = mergeMetadata({ title: '' });

			expect(metadata.title).toBe('Allen Lee');
		});

		it('should handle empty string description', () => {
			const metadata = mergeMetadata({ description: '' });

			expect(metadata.description).toBe('My code sometimes works.');
		});

		it('should handle null/undefined in options', () => {
			const metadata = mergeMetadata({
				title: undefined,
				description: undefined,
				image: undefined,
				imageAlt: undefined,
			});

			expect(metadata.title).toBe('Allen Lee');
			expect(metadata.description).toBe('My code sometimes works.');
		});

		it('should handle very long title', () => {
			const longTitle = 'A'.repeat(100);
			const metadata = mergeMetadata({ title: longTitle });

			expect(metadata.title).toContain(longTitle);
		});

		it('should handle image path with query params', () => {
			const metadata = mergeMetadata({
				image: '/images/dynamic.png?v=1',
			});

			expect(metadata.openGraph?.images?.url).toContain('dynamic.png');
		});
	});

	describe('structure consistency', () => {
		it('should always have consistent metadata structure', () => {
			const metadata = mergeMetadata();

			expect(metadata).toMatchObject({
				title: expect.any(String),
				description: expect.any(String),
				icons: expect.any(Object),
				manifest: expect.any(String),
				openGraph: expect.any(Object),
				twitter: expect.any(Object),
			});
		});

		it('should preserve all required OpenGraph fields', () => {
			const metadata = mergeMetadata();

			expect(metadata.openGraph).toMatchObject({
				siteName: expect.any(String),
				title: expect.any(String),
				description: expect.any(String),
				images: expect.any(Object),
			});
		});

		it('should preserve all required Twitter fields', () => {
			const metadata = mergeMetadata();

			expect(metadata.twitter).toMatchObject({
				title: expect.any(String),
				card: expect.any(String),
				site: expect.any(String),
				images: expect.any(Array),
			});
		});
	});
});
