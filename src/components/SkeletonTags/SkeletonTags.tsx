import { HStack, Skeleton } from "native-base";

export const SkeletonTags = () => {
  return (
    <HStack space='2' mb='20px'>
      <Skeleton size='5' width='40%' rounded='full' />
      <Skeleton size='5' width='10%' rounded='full' />
      <Skeleton size='5' width='15%' rounded='full' />
      <Skeleton size='5' width='25%' rounded='full' />
    </HStack>
  );
};
