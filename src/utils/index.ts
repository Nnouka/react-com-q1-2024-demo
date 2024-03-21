export const loadScriptSync = (
  src: string,
  id: string,
): Promise<boolean | string> =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = () => resolve('script loaded');
    script.src = src;
    if (id) {
      script.id = id;
    }
    script.type = 'text/javascript';
    script.async = false;
    document.getElementsByTagName('body')[0].appendChild(script);
});