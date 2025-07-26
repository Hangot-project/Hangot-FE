import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SERVER_PARAMS_KEY } from "../constants/dataset-search-params";

export function useSearchQuery() {
  const searchParams = useSearchParams();
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  const parseSearchQuery = useCallback((query: string) => {
    const tagPattern = /#[\w가-힣]+/g;
    const tags = query.match(tagPattern) || [];
    const keywords = query.replace(tagPattern, "").trim();

    return {
      keywords,
      tags: tags.map((tag) => tag.substring(1)),
    };
  }, []);

  useEffect(() => {
    const keyword = searchParams.get(SERVER_PARAMS_KEY.KEYWORD);

    if (keyword) {
      const parsed = parseSearchQuery(keyword);
      setCurrentKeyword(parsed.keywords);
      setCurrentTags(parsed.tags);
    } else {
      setCurrentKeyword("");
      setCurrentTags([]);
    }
  }, [searchParams, parseSearchQuery]);

  return {
    currentKeyword,
    currentTags,
  };
}
