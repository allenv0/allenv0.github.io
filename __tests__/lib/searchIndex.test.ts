import { searchItems, SearchItem } from '@/lib/searchIndex';

describe('searchIndex', () => {
	const mockItems: SearchItem[] = [
		{
			id: 'home',
			title: 'Home',
			description: 'Home page',
			href: '/',
			type: 'page',
			priority: 10,
		},
		{
			id: 'blog',
			title: 'Blog',
			description: 'Blog posts and writings',
			href: '/blog',
			type: 'page',
			priority: 8,
		},
		{
			id: 'about',
			title: 'About',
			description: 'About me and my projects',
			href: '/about',
			type: 'page',
			priority: 7,
		},
		{
			id: 'contact',
			title: 'Contact',
			href: '/contact',
			type: 'page',
			priority: 6,
		},
		{
			id: 'post-1',
			title: 'Understanding TypeScript',
			description: 'Deep dive into TypeScript types',
			href: '/blog/typescript',
			type: 'post',
			priority: 4,
			tags: ['typescript', 'programming'],
		},
		{
			id: 'post-2',
			title: 'React Best Practices',
			description: 'Component design patterns',
			href: '/blog/react',
			type: 'post',
			priority: 4,
			tags: ['react', 'javascript'],
		},
	];

	describe('empty query', () => {
		it('should return high-priority items when query is empty', () => {
			const results = searchItems('', mockItems);

			expect(results).toContainEqual(mockItems[0]); // home (priority 10)
			expect(results).toContainEqual(mockItems[1]); // blog (priority 8)
			expect(results).toContainEqual(mockItems[2]); // about (priority 7)
		});

		it('should return max 8 items', () => {
			const manyItems: SearchItem[] = Array.from({ length: 15 }, (_, i) => ({
				id: `item-${i}`,
				title: `Item ${i}`,
				href: `/item-${i}`,
				type: 'page' as const,
				priority: 10 - Math.floor(i / 2),
			}));

			const results = searchItems('', manyItems);
			expect(results.length).toBeLessThanOrEqual(8);
		});

		it('should filter items with priority < 7 when query is empty', () => {
			const results = searchItems('', mockItems);

			// Should not include post-1 or post-2 (priority 4)
			expect(results).not.toContainEqual(mockItems[4]);
			expect(results).not.toContainEqual(mockItems[5]);
		});

		it('should sort by priority descending', () => {
			const results = searchItems('', mockItems);

			for (let i = 0; i < results.length - 1; i++) {
				expect((results[i].priority || 0)).toBeGreaterThanOrEqual(
					results[i + 1].priority || 0
				);
			}
		});
	});

	describe('exact match', () => {
		it('should find exact title match', () => {
			const results = searchItems('Blog', mockItems);

			expect(results.length).toBeGreaterThan(0);
			expect(results[0].id).toBe('blog');
		});

		it('should find exact match case-insensitively', () => {
			const results = searchItems('blog', mockItems);

			expect(results.length).toBeGreaterThan(0);
			expect(results[0].id).toBe('blog');
		});

		it('should prioritize exact title matches', () => {
			const results = searchItems('blog', mockItems);

			expect(results[0].title).toBe('Blog');
		});
	});

	describe('prefix match', () => {
		it('should find items starting with query', () => {
			const results = searchItems('Blo', mockItems);

			expect(results).toContainEqual(mockItems[1]); // Blog
		});

		it('should rank prefix matches high', () => {
			const results = searchItems('Re', mockItems);

			expect(results.some((item) => item.title.startsWith('Re'))).toBe(true);
		});
	});

	describe('contains match', () => {
		it('should find items containing query', () => {
			const results = searchItems('post', mockItems);

			expect(results.some((item) => item.title.toLowerCase().includes('post'))).toBe(
				true
			);
		});

		it('should find in description', () => {
			const results = searchItems('dive', mockItems);

			expect(results.length).toBeGreaterThan(0);
		});

		it('should find multiple partial matches', () => {
			const results = searchItems('ing', mockItems);

			// Should match "Understanding", "typescript", "writing", "programming"
			expect(results.length).toBeGreaterThan(0);
		});
	});

	describe('fuzzy match', () => {
		it('should find fuzzy matches', () => {
			const results = searchItems('typscrpt', mockItems);

			expect(results.length).toBeGreaterThan(0);
		});

		it('should score fuzzy matches lower than prefix', () => {
			const prefixResults = searchItems('Under', mockItems);
			const fuzzyResults = searchItems('Unde', mockItems);

			expect(prefixResults[0]?.priority).toBeGreaterThanOrEqual(
				fuzzyResults[0]?.priority || 0
			);
		});
	});

	describe('tag matching', () => {
		it('should find items by tag', () => {
			const results = searchItems('typescript', mockItems);

			expect(results.some((item) => item.id === 'post-1')).toBe(true);
		});

		it('should boost results with tag matches', () => {
			const results = searchItems('react', mockItems);

			const reactPost = results.find((item) => item.id === 'post-2');
			expect(reactPost).toBeDefined();
		});
	});

	describe('priority weighting', () => {
		it('should weight priority correctly', () => {
			const results = searchItems('po', mockItems);

			const pageItems = results.filter((item) => item.type === 'page');
			const postItems = results.filter((item) => item.type === 'post');

			if (pageItems.length > 0 && postItems.length > 0) {
				expect(pageItems[0].priority || 0).toBeGreaterThan(postItems[0].priority || 0);
			}
		});

		it('should prefer higher priority matches', () => {
			const results = searchItems('', mockItems);

			expect(results[0].priority).toBeGreaterThanOrEqual(results[1].priority || 0);
		});
	});

	describe('no results', () => {
		it('should return empty array when no matches', () => {
			const results = searchItems('xyzabc', mockItems);

			expect(results).toEqual([]);
		});

		it('should return empty for non-existent fuzzy match', () => {
			const results = searchItems('zzzzzz', mockItems);

			expect(results).toEqual([]);
		});
	});

	describe('result limiting', () => {
		it('should return max 10 results', () => {
			const manyItems: SearchItem[] = Array.from({ length: 20 }, (_, i) => ({
				id: `item-${i}`,
				title: `Test item ${i}`,
				href: `/item-${i}`,
				type: 'page' as const,
				priority: 10 - i,
			}));

			const results = searchItems('test', manyItems);

			expect(results.length).toBeLessThanOrEqual(10);
		});

		it('should return fewer items if fewer matches', () => {
			const results = searchItems('blog', mockItems);

			expect(results.length).toBeLessThanOrEqual(mockItems.length);
		});
	});

	describe('description and title combinations', () => {
		it('should find by title or description', () => {
			const results = searchItems('writings', mockItems);

			expect(results.some((item) => item.id === 'blog')).toBe(true);
		});

		it('should prioritize title over description', () => {
			const items: SearchItem[] = [
				{
					id: '1',
					title: 'Blog',
					description: 'Blog content here',
					href: '/blog',
					type: 'page',
				},
				{
					id: '2',
					title: 'Home',
					description: 'Blog about my life',
					href: '/home',
					type: 'page',
				},
			];

			const results = searchItems('blog', items);

			expect(results[0].id).toBe('1'); // Title match first
		});
	});

	describe('edge cases', () => {
		it('should handle whitespace queries', () => {
			const results = searchItems('   ', mockItems);

			expect(results.length).toBeGreaterThan(0);
		});

		it('should handle special characters', () => {
			const results = searchItems('!@#$', mockItems);

			expect(results).toEqual([]);
		});

		it('should handle very long queries', () => {
			const longQuery = 'a'.repeat(100);
			const results = searchItems(longQuery, mockItems);

			expect(results).toEqual([]);
		});

		it('should handle items without optional fields', () => {
			const minimalItems: SearchItem[] = [
				{
					id: 'minimal',
					title: 'Minimal',
					href: '/minimal',
					type: 'page',
				},
			];

			const results = searchItems('minimal', minimalItems);

			expect(results).toContainEqual(minimalItems[0]);
		});
	});
});
