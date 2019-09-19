const Translate = require('../../libs/translate');

describe('lib.translate', () => {
  it('successful translation', () => {
    const translation = Translate.getTranslation('en', '1');
    expect(translation).not.toBeNull();
  });

  it('successful translation with wrong lang', () => {
    const translation = Translate.getTranslation('safsdgd', '1');
    expect(translation).not.toBeNull();
  });

  it('translation error', async () => {
    expect(() => {
      Translate.getTranslation('en', '999');
    }).toThrow();
  });
});
