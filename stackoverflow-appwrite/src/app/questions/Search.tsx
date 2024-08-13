"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    () => setSearch(searchParams.get("search") || "");

  },[searchParams])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set("search", search)
      router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
      <form className="flex w-full flex-row gap-4" onSubmit={handleSearch}>
          <Input
              type="text"
              placeholder="Search questions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
          <button className="shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
              Search
          </button>
      </form>
  );
}

export default Search