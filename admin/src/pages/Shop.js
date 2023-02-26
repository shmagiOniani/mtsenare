import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { ShopCard, ShopSearch, ShopSort } from 'src/sections/@dashboard/shop';
// mock
import POSTS from '../_mock/blog';
import AddShop from 'src/components/dialog/AddShop';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Shop() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const getBlogs= ()=> {
    
  }

  const closeAddDialog = ()=> {
    setDialogOpen(false)
  }

  const opnAddDialog = ()=> {
    setDialogOpen(true)
  }

  useEffect(()=> {
    getBlogs()
  },[])
  return (
    <>
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shop List
          </Typography>
          <Button variant="contained" onClick={opnAddDialog} component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Shop
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ShopSearch posts={POSTS} />
          <ShopSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <ShopCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
    <AddShop open={dialogOpen} handleClose={closeAddDialog}  />

    </>
  );
}
