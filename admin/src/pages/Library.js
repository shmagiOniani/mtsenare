import { useState } from 'react';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
// components
import AddLibrary from '../components/dialog/AddLibrary';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
// sections
import { LibraryCollapsibleTable } from '../sections/@dashboard/library';


export default function Library() {

  const [libraryDialog, setLibraryDialog] = useState(false);

  const handleCloseLibrary =()=> {
    setLibraryDialog(false)
  }

  return (
    <>
      <Page title="Library">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Category
            </Typography>
            <Button
              variant="contained"
              onClick={() => setLibraryDialog(true)}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Item
            </Button>
          </Stack>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <LibraryCollapsibleTable refresh={libraryDialog}/>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Container>
      </Page>
      <AddLibrary open={libraryDialog} handleClose={handleCloseLibrary} target={"Library"} id={""} />
    </>
  );
}
