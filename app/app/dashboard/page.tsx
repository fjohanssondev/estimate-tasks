import { CreateNewBoard } from "@/components/new-board-dialog";

export default async function Dashboard(){
  return (
    <div>
      <h1>Dashboard</h1>
      <CreateNewBoard />
    </div>
  )
}