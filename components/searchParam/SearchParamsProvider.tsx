"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchParamsComponent = ({setTypeParam}: {setTypeParam: (param: string | null) => void}) => {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  useEffect(() => {
    setTypeParam(typeParam);
  }, [typeParam, setTypeParam]);

  return null;
};

export default SearchParamsComponent;
