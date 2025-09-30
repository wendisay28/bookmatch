// Asegurar que TypeScript reconozca las importaciones de módulos
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

// Para archivos de imagen
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';

// Para archivos de fuente
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';

// Para otros tipos de archivo
declare module '*.mp4';
declare module '*.webm';
declare module '*.wav';
declare module '*.mp3';
declare module '*.m4a';
declare module '*.aac';
declare module '*.oga';

// Para archivos de datos
declare module '*.json';
declare module '*.yaml';
declare module '*.yml';
