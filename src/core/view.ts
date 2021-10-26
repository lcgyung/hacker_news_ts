export default abstract class View {
  private template: string; // 초기 View
  private renderTemplate: string; // 동적 View
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw "Root container is not found";
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join("");
    this.clearHtmlList();
    return snapshot;
  }

  protected addhtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate; // UI 변경
    this.renderTemplate = this.template; // 변경을 위한 render Template 초기화
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(): void;
}
