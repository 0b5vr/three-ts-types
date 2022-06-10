import { IUniform, Shader, Texture } from '../../../src/Three';

export const ACESFilmicToneMappingShader: Shader<{
    tDiffuse: IUniform<Texture>;
    exposure: IUniform<number>;
}>;
