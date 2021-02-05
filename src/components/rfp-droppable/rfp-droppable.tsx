import { Component, Element, Event, EventEmitter, Method, Host, h } from '@stencil/core';

@Component({
  tag: 'rfp-droppable',
  styleUrl: 'rfp-droppable.css',
  shadow: true,
})
export class RfpDroppable {
  @Element() hostElement: HTMLElement;
  @Event() elementDropped: EventEmitter;

  @Method()
  async complete(ev, data) {
    if (this.isInsideDroppableArea(ev.currentX, ev.currentY)) {
      this.elementDropped.emit(data);
    }
  }

  isInsideDroppableArea(x, y) {
    const droppableArea = this.hostElement.getBoundingClientRect();
    if (x < droppableArea.left || x >= droppableArea.right) {
      return false;
    }
    if (y < droppableArea.top || y >= droppableArea.bottom) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
