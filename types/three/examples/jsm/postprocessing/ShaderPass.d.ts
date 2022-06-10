import { IUniform, Shader, ShaderMaterial } from '../../../src/Three';

import { Pass } from './Pass';

export class ShaderPass<TUniforms = { [name: string]: IUniform }> extends Pass {
    constructor(shader: Shader<TUniforms>, textureID?: string);
    textureID: string;
    uniforms: TUniforms;
    material: ShaderMaterial;
    fsQuad: object;
}
