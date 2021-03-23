const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
exports.insertOrganization = async (req, res) => {
  const body = req.body;
  console.log({body})
  try {

    var organizationAdded = await prisma.oRGANIZATION.create({
      data: {
        NAME: body.organization
      }
    })

    console.log({organizationAdded})
   
    if (organizationAdded) {
    
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

exports.readOrganization = async (req, res) => {
  try {

    const result = JSON.parse(
      JSON.stringify(
        await prisma.oRGANIZATION.findMany({})
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


exports.deleteOrganization = async (req, res) => {
  try {

    const { orgId } = req.params;

    const result = await prisma.oRGANIZATION.delete({
      where: {
        ID: parseInt(orgId),
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