import Layout1 from "../../Comps/Layouts/Layout1/Layout"

const UserDetails = ({ dakk }) => {
  return (
    <div>
      <h1>{dakk.name}</h1>
      <p>{dakk.username}</p>
      <p>{dakk.email}</p>
      <p>{dakk.address.city}</p>
      <p>{dakk.phone}</p>
    </div>
  )
}

export const getStaticPaths = async () => {
  // to return object on each iteration
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  //parse json into array
  const data = await res.json()

  //iterate with map
  const paths = data.map((dakk) => {
    return {
      params: { dynamic_user_pages: dakk.id.toString() },
    }
  })
  return {
    paths,
    fallback: false, //404 💩 page is N/A
  }
}
export const getStaticProps = async (ctx) => {
  const id = ctx.params.dynamic_user_pages
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id)
  //parse json into array
  const data = await res.json()

  return {
    props: {
      dakk: data,
    },
  }
}

UserDetails.layout = (page) => <Layout1>{page}</Layout1>
export default UserDetails