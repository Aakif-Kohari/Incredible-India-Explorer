import { describe, it, expect } from 'vitest';

describe('Search Functionality Unit Tests', () => {
  const searchIndex = [
    { title: 'Taj Mahal', category: 'Monuments', tags: ['heritage', 'agra'] },
    { title: 'Butter Chicken', category: 'Cuisine', tags: ['food', 'punjab'] },
    { title: 'Diwali Festival', category: 'Festivals', tags: ['lights', 'national'] }
  ];

  it('filters items based on search query', () => {
    const filterSearch = (query) => {
      const q = query.toLowerCase().trim();
      return searchIndex.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      );
    };

    expect(filterSearch('taj')).toHaveLength(1);
    expect(filterSearch('heritage')).toHaveLength(1);
    expect(filterSearch('food')).toHaveLength(1);
    expect(filterSearch('nonexistent')).toHaveLength(0);
  });

  it('highlights search query in text', () => {
    const highlightText = (text, query) => {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    };

    expect(highlightText('Taj Mahal', 'Taj')).toBe('<mark>Taj</mark> Mahal');
  });
});
