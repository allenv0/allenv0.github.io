import { featuredProjects, socialLinks, siteConfig } from '@/config';

describe('Configuration Files', () => {
  describe('featuredProjects', () => {
    it('should be an array', () => {
      expect(Array.isArray(featuredProjects)).toBe(true);
    });

    it('should contain projects with required fields', () => {
      featuredProjects.forEach((project) => {
        expect(project).toHaveProperty('name');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('cover');
        expect(project).toHaveProperty('coverAlt');
        expect(typeof project.name).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.cover).toBe('string');
        expect(typeof project.coverAlt).toBe('string');
      });
    });

    it('should contain valid project names', () => {
      const projectNames = featuredProjects.map(p => p.name);
      expect(projectNames).toContain('Cued');
      expect(projectNames).toContain('AirPosture');
    });
  });

  describe('socialLinks', () => {
    it('should be an array', () => {
      expect(Array.isArray(socialLinks)).toBe(true);
    });

    it('should contain links with required fields', () => {
      socialLinks.forEach((link) => {
        expect(link).toHaveProperty('name');
        expect(link).toHaveProperty('href');
        expect(link).toHaveProperty('icon');
        expect(link).toHaveProperty('label');
        expect(typeof link.name).toBe('string');
        expect(typeof link.href).toBe('string');
        expect(typeof link.label).toBe('string');
        expect(typeof link.icon).toBe('function');
      });
    });

    it('should contain valid social platforms', () => {
      const linkNames = socialLinks.map(l => l.name);
      expect(linkNames).toContain('blog');
      expect(linkNames).toContain('github');
      expect(linkNames).toContain('twitter');
    });
  });

  describe('siteConfig', () => {
    it('should have required site configuration', () => {
      expect(siteConfig).toHaveProperty('name');
      expect(siteConfig).toHaveProperty('description');
      expect(siteConfig).toHaveProperty('centralImage');

      expect(siteConfig.name).toBe('Allen Lee');
      expect(typeof siteConfig.description).toBe('string');
      expect(typeof siteConfig.centralImage).toBe('object');
    });

    it('should have valid central image configuration', () => {
      const { centralImage } = siteConfig;
      expect(centralImage).toHaveProperty('src');
      expect(centralImage).toHaveProperty('alt');
      expect(centralImage).toHaveProperty('width');
      expect(centralImage).toHaveProperty('height');

      expect(typeof centralImage.src).toBe('string');
      expect(typeof centralImage.alt).toBe('string');
      expect(typeof centralImage.width).toBe('number');
      expect(typeof centralImage.height).toBe('number');

      expect(centralImage.src).toContain('/images/projects/mac.png');
      expect(centralImage.width).toBe(320);
      expect(centralImage.height).toBe(320);
    });
  });
});