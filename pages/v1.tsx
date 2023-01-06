import { NextPage } from "next"
import Layout from "../components/Layout"
import { KanbanContainer } from "../components/Container"

const KanbanPage: NextPage = () => {
  return (
    <Layout title="Kanban Board" description="Kanban Board">
      <KanbanContainer />
    </Layout>
  )
}

export default KanbanPage
