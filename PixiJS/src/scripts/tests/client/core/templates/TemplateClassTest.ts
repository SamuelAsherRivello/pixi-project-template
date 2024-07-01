import { TemplateClass } from '@client/core/templates/TemplateClass';

let templateClass: TemplateClass;

beforeAll(() => {
  //console.log('TemplateClassTest.beforeAll()');
});

beforeEach(() => {
  //console.log('TemplateClassTest.beforeEach()');
  templateClass = new TemplateClass();
});

afterEach(() => {
  //console.log('TemplateClassTest.afterEach()');
});

afterAll(() => {
  //console.log('TemplateClassTest.afterAll()');
});

test('instance is not null when default', () => {
  // Arrange

  // Act
  let result = templateClass.add(1, 2);

  // Assert
  expect(templateClass).not.toBeNull();
});

test('add, result is 3, when 1 & 2', () => {
  // Arrange

  // Act
  let result = templateClass.add(1, 2);

  // Assert
  expect(result).toBe(3);
});

describe('templateClass.add', () => {
  const testCases = [
    [-3, -3, -6],
    [0, 0, 0],
    [1, 1, 2],
    [3, 3, 6],
  ];

  test.each(testCases)('add(%i, %i) should return %i', (a, b, expected) => {
    // Arrange
    // (No specific arrangement needed for this test)

    // Act
    const result = templateClass.add(a, b);

    // Assert
    expect(result).toBe(expected);
  });
});

test('samplePublicText, result is "", when default', () => {
  // Arrange

  // Act
  let result = templateClass.samplePublicText;

  // Assert
  expect(result).toBe('');
});

test('samplePublicText, result is "hello123", when set "hello123" ', () => {
  // Arrange
  let expected = 'hello123';

  // Act
  templateClass.samplePublicText = expected;
  let result = templateClass.samplePublicText;

  // Assert
  expect(result).toBe(expected);
});
