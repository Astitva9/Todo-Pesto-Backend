const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
exports.insertTodo = async (req, res) => {
  const body = req.body;
  console.log({body})
  try {

    var todoAdded = await prisma.tODO.create({
      data: {
        ORGANIZATION_ID: body.organizationID,
        TODO_TASK:body.todoTask
      }
    })

    console.log({todoAdded})
   
    if (todoAdded) {
    
      return res.status(200).json({
        status: true,
        message: "Successfully Added"
      });

    } else {

      return res.status(500).json({
        status: false,
        message: "Something went Wrong",
      });

    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

exports.readTodo = async (req, res) => {
  try {
    const {orgId} = req.params;

    const result = JSON.parse(
      JSON.stringify(
        await prisma.tODO.findMany({
          where: { ORGANIZATION_ID: parseInt(orgId) }
        })
      )
    );

    return res.status(200).json({
      status: true,
      data: result
    });

  } catch (err) {
    console.log({ err });
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};


exports.deleteTodo = async (req, res) => {
  try {

    const { todoId } = req.params;

    const result = await prisma.tODO.delete({
      where: {
        ID: parseInt(todoId),
      },
    })

    if(result){
      return res.status(200).json({
        status: true,
        data: "Successfully deleted"
      });
    }
    return res.status(500).json({
      status: false,
      message: 'Something Went Wrong!! Please try again'
    });

  } catch (err) {
    console.log({ err });
    return res.status(500).json({
      status: false,
      message: err,
    });
  }
};