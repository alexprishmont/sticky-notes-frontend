import config from '@/config';

const auth = ({ next, router }) => {
  if (!localStorage.getItem(config.AUTH_HEADER)) {
    return router.push({ path: '/login' });
  }

  return next();
};

export default auth;
