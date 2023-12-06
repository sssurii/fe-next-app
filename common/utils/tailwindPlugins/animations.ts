const plugin = require('tailwindcss/plugin');

const animations = plugin(function ({
  matchUtilities, theme,
}: { matchUtilities: any, theme: any }) {
  matchUtilities({
    "animation-delay": (value: string) => {
      return {
        animationDelay: value,
      };
    },
  }, {
    values: theme('animationDelay'),
  });
})

module.exports = animations;
