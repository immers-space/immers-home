import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

export function useCompressedGLTF(src) {
    const { gl } = useThree()
  return useGLTF(src, false, true, loader => {
    var ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/npm/super-three@0.141.0/examples/js/libs/basis/')
    ktx2Loader.detectSupport(gl)
    loader.setKTX2Loader(ktx2Loader)
  })
}
