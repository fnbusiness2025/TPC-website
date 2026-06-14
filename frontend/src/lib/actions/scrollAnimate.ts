
export function scrollAnimate(node: HTMLElement, options: { 
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in',
  duration?: number,
  delay?: number,
  once?: boolean,
  threshold?: number
} = {}) {
  const {
    animation = 'fade-up',
    duration = 700,
    delay = 0,
    once = true,
    threshold = 0.1
  } = options;

  // Base styles for all animations
  node.style.transitionProperty = 'opacity, transform';
  node.style.transitionDuration = `${duration}ms`;
  node.style.transitionDelay = `${delay}ms`;
  node.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)'; // smooth out quint
  node.style.opacity = '0';

  // Initial transform state
  const transforms = {
    'fade-up': 'translateY(30px)',
    'fade-down': 'translateY(-30px)',
    'fade-left': 'translateX(30px)',
    'fade-right': 'translateX(-30px)',
    'fade-in': 'scale(0.95)'
  };

  node.style.transform = transforms[animation];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        node.style.opacity = '1';
        node.style.transform = 'translate(0, 0) scale(1)';
        if (once) observer.unobserve(node);
      } else if (!once) {
        node.style.opacity = '0';
        node.style.transform = transforms[animation];
      }
    });
  }, { threshold });

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}
