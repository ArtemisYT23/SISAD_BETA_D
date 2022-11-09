import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import SesionReducer from "./states/LoginUser";
import GroupReducer from "./states/Group";
import CabinetReducer from "./states/Cabinet";
import NameReducer from "./states/Name";
import UserSecurityReducer from "./states/UserSesion";
import ViewReducer from "./states/View";
import ActionReducer from "./states/ActionCore";
import FileTypeReducer from "./states/FileType";
import FolderReducer from "./states/Folder";
import HistoryReducer from "./states/History";
import DocumentaryReducer from "./states/Document";
import ModalDocumentaryReducer from "./states/ActionDocumentary";
import FilesCoreReducer from "./states/Files";
import ModalConfigReducer from "./states/ActionConfig";
import IndexReducer from "./states/Indexes";
import ListReducer from "./states/List";
import TypeDataReducer from "./states/DataType";
import MetadataReducer from "./states/Metadata";

//formData
import GroupDataReducer from "../redux/formData/GroupData";
import CabinetDataReducer from "../redux/formData/CabinetData";
import FolderDataReducer from "../redux/formData/FolderData";
import IndexDataReducer from "./formData/IndexData";

const rootReducer = combineReducers({
    sesion: SesionReducer,
    groupCore: GroupReducer,
    cabinetCore: CabinetReducer,
    nameCore: NameReducer,
    userSesion: UserSecurityReducer,
    viewCore: ViewReducer,
    modalCore: ActionReducer,
    groupData: GroupDataReducer,
    cabinetData: CabinetDataReducer,
    typeFileCore: FileTypeReducer,
    folderCore: FolderReducer,
    historyCore: HistoryReducer,
    folderData: FolderDataReducer,
    documentary: DocumentaryReducer,
    modalDocumentary: ModalDocumentaryReducer,
    filesCore: FilesCoreReducer,
    modalConfig: ModalConfigReducer,
    indexCore: IndexReducer,
    indexData: IndexDataReducer,
    listCore: ListReducer,
    typeDataCore: TypeDataReducer,
    metaCore: MetadataReducer,
});

export default function generateStore(){
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
}