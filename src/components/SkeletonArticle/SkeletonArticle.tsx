import React from "react";
import { Center, Skeleton, VStack } from "native-base";

export const SkeletonArticle = () => {
  return (
    <Center w='100%'>
      <VStack
        w='100%'
        h='100%'
        borderWidth='1'
        space={10}
        overflow='hidden'
        rounded='md'
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h='150' />
        <Skeleton.Text px='4' lines={20} />
      </VStack>
    </Center>
  );
};
