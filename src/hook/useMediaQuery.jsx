import { useMediaQuery } from 'react-responsive';

function useScreens() {
  return {
    mobileS: useMediaQuery({ query: '(max-width: 320px)' }),
    mobileM: useMediaQuery({
      query: '(min-width: 321px) and (max-width: 375px)',
    }),
    mobileL: useMediaQuery({
      query: '(min-width: 376px) and (max-width: 425px)',
    }),

    tablet: useMediaQuery({
      query: '(min-width: 426px) and (max-width: 768px)',
    }),

    laptopS: useMediaQuery({
      query: '(min-width: 769px) and (max-width: 1024px)',
    }),

    laptopL: useMediaQuery({
      query: '(min-width: 1025px) and (max-width: 1440px)',
    }),

    desktop: useMediaQuery({
      query: '(min-width: 1441px) and (max-width: 1824px)',
    }),

    bigScreen: useMediaQuery({
      query: '(min-width: 1825px)',
    }),
  };
}

export default useScreens;
