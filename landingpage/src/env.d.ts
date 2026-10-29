declare module "virtual:waterpark/freva" {
  /** Built from .prepared/manifest.json by integrations/freva.mjs; null when not prepared. */
  const freva: {
    config: Record<string, unknown>;
    script: string;
    styles: string;
    notebook: string;
  } | null;
  export default freva;
}
