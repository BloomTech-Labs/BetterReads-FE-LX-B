import React, { useState } from "react";
import { withApollo } from "../utils/withApollo";
import { NavBar } from "../components/NavBar";
import { SearchBooks } from "../components/SearchBooks";
import { useMyBookshelvesQuery, useMyBooksQuery } from "../generated/graphql";
import { HomeLibrary } from "../components/HomeLibrary";
import { Box } from "@chakra-ui/core";
import { PageLayout } from "../components/PageLayout";

interface shelvesProps {}

const Shelves: React.FC<shelvesProps> = ({}) => {
  const { data, loading } = useMyBookshelvesQuery();
  const { data: anotherData, loading: anotherLoading } = useMyBooksQuery();
  const favorited = anotherData?.myBooks.filter((x) => x.favorited);
  const toBeRead = anotherData?.myBooks.filter(
    (x) => x.readingStatus === "To Read"
  );
  console.log(anotherData);
  const reading = anotherData?.myBooks.filter(
    (x) => x.readingStatus === "Reading"
  );
  const finished = anotherData?.myBooks.filter(
    (x) => x.readingStatus === "Finished"
  );
  console.log(favorited);
  console.log(toBeRead);
  console.log(reading);
  console.log(finished);
  return (
    <>
      <NavBar />
      <SearchBooks />
      <PageLayout>
        <HomeLibrary library={"My Books"} books={anotherData?.myBooks} />
        <HomeLibrary library={"Favorites"} books={favorited} />
        <HomeLibrary library={"To be read"} books={toBeRead} />
        <HomeLibrary library={"Reading"} books={reading} />
        <HomeLibrary library={"Finished"} books={finished} />
        <Box>
          {data?.myBookshelves?.map((x) => (
            <HomeLibrary
              library={x.name}
              books={x.bookshelvesUserBooks.map((y) => y.userBook)}
            />
          ))}
        </Box>
      </PageLayout>
    </>
  );
};

export default withApollo({ ssr: true })(Shelves);
