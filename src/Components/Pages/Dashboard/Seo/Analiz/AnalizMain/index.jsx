import React, { useEffect, useState } from 'react';
import AnalizMainWrapper from './style';
import { useConfirm } from 'material-ui-confirm';
import AnalizProvider from '../../../../../../Data/AnalizProvider';
import { toast } from 'react-toastify';
import { Button, Drawer, IconButton } from '@mui/material';
import EditSvg from '../../../../../Common/Svgs/EditSvg';
import DeleteSvg from '../../../../../Common/Svgs/DeleteSvg';
import MinLoader from '../../../../../Common/MinLoader';
import AddAnaliz from '../AddAnaliz';
import UpdateAnaliz from '../UpdateAnaliz';

const AnalizMain = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analiz, setAnaliz] = useState([]);
  const [editAnaliz, setEditAnaliz] = useState({});
  const confirm = useConfirm();

  const handleDeleteAnaliz = (obj) => {
    confirm({
      title: "Rostan ham o'chirishni xohlaysizmi?",
      confirmationText: "Ha",
      cancellationText: "Yo'q",
    })
      .then(async () => {
        await AnalizProvider.deleteAnalysis(obj.id);
        setAnaliz((p) =>
          p.filter((reg) => {
            return reg.id !== obj.id;
          })
        );
        toast.success("O'chirildi!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditAnaliz = (obj) => {
    setIsOpenModal2(true);
    setEditAnaliz(obj);
  };

  useEffect(() => {
    setLoading(true);
    AnalizProvider.getAllAnalysis(0, 10000)
      .then((res) => {
        setAnaliz(res.data.data.content);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpenModal, isOpenModal2, editAnaliz]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  const onCloseModal2 = () => {
    setIsOpenModal2(false);
  };
    return (
        <AnalizMainWrapper>
            <div className="top">
          <h3 className="col-2">Analizlar</h3>
          <Button
            class="col-2 btn btn-primary btn-rounded"
            variant="contained"
            onClick={() => openModal()}
          >
            Analiz qo`shish
          </Button>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ minWidth: "40%" }} className="col">
              Analiz nomi
              </th>
              <th style={{ minWidth: "40%" }} className="col">
              Labaratory nomi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              analiz.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "40%" }} className="col">
                    {index + 1}. {obj.name}
                  </td>
                  <td style={{ minWidth: "40%" }} className="col">
                   {obj.laboratory?.name}
                  </td>
                  <td style={{ minWidth: "20%" }} className="col">
                    <div className="btns">
                      <a class="text-success mr-2" href="#">
                        <i class="nav-icon i-Pen-2 font-weight-bold"></i>
                      </a>
                      <IconButton
                      onClick={() => handleEditAnaliz(obj)}
                      >
                        <EditSvg />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAnaliz(obj)}>
                        <DeleteSvg />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
        <Drawer
          anchor={"right"}
          open={isOpenModal}
          onClose={() => {
            onCloseModal();
          }}
        >
          <AddAnaliz onCloseModal={onCloseModal} />
        </Drawer>
        <Drawer
          anchor={"right"}
          open={isOpenModal2}
          onClose={() => {
            onCloseModal2();
          }}
        >
          <UpdateAnaliz onCloseModal2={onCloseModal2} editAnaliz={editAnaliz}/>
        </Drawer>
        </AnalizMainWrapper>
    );
};

export default AnalizMain;