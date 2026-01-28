import { Project, SocialLink, FeaturedProject } from '@/config/types';

describe('Configuration Types', () => {
  it('should allow valid Project structure', () => {
    const project: Project = {
      cover: 'test.png',
      coverAlt: 'Test project cover',
      description: 'Test description',
      links: {
        'Demo': 'https://example.com'
      }
    };

    expect(project.cover).toBe('test.png');
    expect(project.description).toBe('Test description');
    expect(project.links?.['Demo']).toBe('https://example.com');
  });

  it('should allow minimal Project structure', () => {
    const project: Project = {
      description: 'Minimal project'
    };

    expect(project.description).toBe('Minimal project');
    expect(project.cover).toBeUndefined();
  });

  it('should allow valid SocialLink structure', () => {
    const socialLink: SocialLink = {
      name: 'github',
      href: 'https://github.com/test',
      icon: () => null, // Mock icon component
      label: 'GitHub'
    };

    expect(socialLink.name).toBe('github');
    expect(socialLink.href).toBe('https://github.com/test');
    expect(socialLink.label).toBe('GitHub');
  });

  it('should allow valid FeaturedProject structure', () => {
    const featuredProject: FeaturedProject = {
      name: 'Test Project',
      description: 'A test project',
      cover: 'test.png',
      coverAlt: 'Test cover',
      links: {
        'Website': 'https://test.com'
      }
    };

    expect(featuredProject.name).toBe('Test Project');
    expect(featuredProject.description).toBe('A test project');
    expect(featuredProject.cover).toBe('test.png');
    expect(featuredProject.links?.['Website']).toBe('https://test.com');
  });
});