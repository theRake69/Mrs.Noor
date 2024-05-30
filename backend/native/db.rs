// native/db.rs

#[macro_use]
extern crate neon;

use neon::prelude::*;
use prisma_client::PrismaClient;

pub struct Database {
    client: PrismaClient,
}

declare_types! {
    pub class JsDatabase for Database {
        init(_) {
            Ok(Database {
                client: PrismaClient::new(),
            })
        }

        method createUser(mut cx) {
            let name = cx.argument::<JsString>(0)?.value();
            let email = cx.argument::<JsString>(1)?.value();

            let this = cx.this();
            let user = {
                let guard = cx.lock();
                let db = this.borrow(&guard);
                db.client.user.create(
                    prisma_client::user::CreateUserInput {
                        name: Some(name),
                        email: Some(email),
                        ..Default::default()
                    }
                )
            };

            match user {
                Ok(user) => Ok(cx.string(format!("User created: {:?}", user))),
                Err(e) => cx.throw_error(format!("{}", e)),
            }
        }
    }
}

register_module!(mut cx, {
    cx.export_class::<JsDatabase>("Database")?;
    Ok(())
});
