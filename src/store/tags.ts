import * as remx from "remx";
import { Article } from "../types/article";

type TagsState = {
    tags: string[],
    selectedTag: string,
}

const initialTagsState: TagsState = {
    tags: [],
    selectedTag: '',
  };
  
  const tagsState = remx.state(initialTagsState);

  const tagsSetters = remx.setters({
    setTags(tags: string[]) {
        tagsState.tags = tags;
    },
  
    setSelectedTag(tag: string) {
        tagsState.selectedTag = tag;
    }
  });

  const tagsGetters = remx.getters({
    getTags() {
      return tagsState.tags;
    },
  
    getSelectedTag() {
      return tagsState.selectedTag;
    },
  });

  export const tagsStore = {
    ...tagsSetters,
    ...tagsGetters,
  };