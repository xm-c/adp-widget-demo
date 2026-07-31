/// <reference types="vite/client" />

// 声明 adp-widget Web Component
declare namespace JSX {
  interface IntrinsicElements {
    "adp-widget": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "widget-json"?: string;
        disable?: boolean;
        locale?: string;
        ref?: React.Ref<HTMLElement>;
      },
      HTMLElement
    >;
  }
}
