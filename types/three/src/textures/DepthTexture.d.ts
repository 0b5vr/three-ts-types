import { Texture } from './Texture';
import { Mapping, Wrapping, TextureFilter, TextureDataType } from '../constants';

export class DepthTexture extends Texture<{ width: number; height: number }> {
    /**
     * @param width
     * @param height
     * @param type
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.NearestFilter]
     * @param [minFilter=THREE.NearestFilter]
     * @param [anisotropy=1]
     */
    constructor(
        width: number,
        height: number,
        type?: TextureDataType,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        anisotropy?: number,
    );

    /**
     * @default false
     */
    flipY: boolean;

    /**
     * @default false
     */
    generateMipmaps: boolean;

    readonly isDepthTexture: true;
}
