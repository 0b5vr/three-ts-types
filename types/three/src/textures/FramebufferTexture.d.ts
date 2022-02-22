import { Texture } from './Texture';
import { PixelFormat } from '../constants';

export class FramebufferTexture extends Texture<{ width: number; height: number }> {
    readonly isFramebufferTexture: true;

    constructor(width: number, height: number, format: PixelFormat);
}
