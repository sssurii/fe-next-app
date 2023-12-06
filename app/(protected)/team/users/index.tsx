'use client';
import { Table } from "@/common/components/organisms/table";
import { Header } from "@/app/(protected)/team/users/header";
import { useGetInfiniteUsers } from "@/app/(protected)/team/users/useGetInfiniteUsers";
import { mockedColumns } from "@/app/(protected)/team/users/mocks";
const Users = () => {
  const {
    usersLoader,
    handleSearchValue,
    searchValue,
    users,
    noResultsText,
    lastElementRef,
    membersCount,
  } = useGetInfiniteUsers();

  return (
    <div className="mt-16 mb-8 w-full overflow-x-auto" data-cy="users-table">
      <Header membersCount={membersCount} onChange={handleSearchValue} searchValue={searchValue} />
      <Table
        data={users}
        columns={mockedColumns}
        noResultsText={noResultsText}
        isLoading={usersLoader}
        lastElementRef={lastElementRef}
      />
    </div>
  )
}

export default Users;
